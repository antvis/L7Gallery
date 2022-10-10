import { InboxOutlined } from '@ant-design/icons';
import { FieldSelectOptionType } from '@antv/larkmap/es/components/LayerAttribute/types';
import { Feature, FeatureCollection } from '@turf/turf';
import { Button, Form, Input, message, Select, Tabs, Upload } from 'antd';
import { uniqueId, debounce } from 'lodash';
import React, { useContext, useState } from 'react';
import {
  bubbleStyle,
  choropletStyle,
  heatmapStyle,
  layerIcon,
  lineStyle,
  options,
} from '../../config';
import { DataSourceCtx } from '../../context/DataSourceContext';
import { GeoData, LayerSourceList } from '../../types';
import { getFieldList, parseDataItem, parserData } from '../../util';
import { Modal } from '../Modal';
import styles from './index.less';
import { useImmer } from 'use-immer';

interface BuildDataProp {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface FormValueProps {
  dataType: string;
  sourceName: string;
  layerType: string;
  sourceData: GeoData;
  x: string; // 经度
  y: string; // 纬度
}

interface StataData {
  active: string;
  fieldLists: FieldSelectOptionType[];
  fileList: any[];
  dataType: boolean;
  value: string;
}

export function BuildData(props: BuildDataProp) {
  const { open, setOpen } = props;
  const { setDataSourceList } = useContext(DataSourceCtx);
  const [form] = Form.useForm();
  const [immer, setImmer] = useImmer<StataData>({
    active: 'url',
    fieldLists: [],
    fileList: [],
    dataType: false,
    value: '',
  });

  const onFinish = (value: FormValueProps) => {
    let initOptions = {};
    switch (value.layerType) {
      case 'LineLayer':
        initOptions = lineStyle(immer.value);
        break;
      case 'ChoroplethLayer':
        initOptions = choropletStyle(immer.value);
        break;
      case 'BubbleLayer':
        initOptions = bubbleStyle(immer.value);
        break;
      case 'HeatmapLayer':
        initOptions = heatmapStyle(immer.value);
        break;
      default:
        break;
    }
    const { data } = value.sourceData;

    const newVal: LayerSourceList = {
      sourceId: uniqueId('layer'),
      sourceData: {
        // 如果不为geojson格式，则过滤掉空的经纬度
        data:
          Array.isArray(data) && value.x && value.y
            ? data.filter((item) => item[value.x] && item[value.y])
            : data,
        parser: {
          ...value.sourceData?.parser,
          ...(value.x && value.y ? { x: value.x, y: value.y } : {}),
        },
      },
      sourceName: value.sourceName,
      fieldList: immer.fieldLists,
      layerOptions: initOptions,
      layerType: value.layerType,
    };
    form.validateFields();
    setOpen(false);
    form.resetFields();
    setTimeout(() => {
      setDataSourceList((pre) => [...pre, newVal as any]);
    }, 500);
  };

  const customRequest = (option: any) => {
    const { file, onSuccess } = option;
    const fileReader = new FileReader();
    const fileFullName = (file as File).name;
    const ext = fileFullName.substring(fileFullName.lastIndexOf('.') + 1);
    fileReader.readAsText(file as File);

    fileReader.onload = (event) => {
      const content = event.target?.result || '';
      let newContent = content as string;
      if (ext === 'json' || ext === 'geojson') {
        newContent = JSON.parse(content as string);
      }
      const newData = parserData(newContent, ext);
      const newFields = parseDataItem(ext, newData);
      setImmer((draft) => {
        (draft.fieldLists = newFields),
          (draft.active = 'file'),
          draft.fileList.push(option?.file),
          (draft.dataType = Array.isArray(newData.data));
        draft.value = newFields[0].value;
      });
      form.setFieldValue('sourceData', newData);
      onSuccess();
    };
  };

  const fetchData = debounce((e: any) => {
    const val = e.target.value;
    const ext = val.substring(val.lastIndexOf('.') + 1);
    if (!['json', 'csv'].includes(ext)) {
      return message.error(`暂不支持[${ext}]格式`);
    }
    fetch(val)
      .then((response) => {
        if (ext === 'csv') {
          return response.text();
        }
        return response.json();
      })
      .then((data: any) => {
        const newData = parserData(data as any, ext);
        const newFields = parseDataItem(ext, newData);
        setImmer((draft) => {
          (draft.fieldLists = newFields), (draft.dataType = Array.isArray(newData.data));
          draft.value = newFields[0].value;
        });
        form.setFieldValue('url', val);
        form.setFieldValue('sourceData', newData);
      });
  }, 500);
  // https://gw.alipayobjects.com/os/bmw-prod/60177f74-5330-43f5-9a8c-9e3098640e87.csv
  // https://gw.alipayobjects.com/os/bmw-prod/163c9fbb-546f-407e-beb1-cc48fdfc2613.json

  const FormData = () => {
    return (
      <Form onFinish={onFinish} form={form} className={styles.form}>
        <Form.Item label="图层名称" name="sourceName" required>
          <Input size="small" autoComplete="off" />
        </Form.Item>
        <Form.Item label="可视化类型" name="layerType" required>
          <Select
            size="small"
            options={options.map((item) => {
              return {
                label: (
                  <div>
                    <img className={styles.icons} src={item.src} />
                    {item.title}
                  </div>
                ),
                value: item.value,
              };
            })}
          />
        </Form.Item>
        <Form.Item name="sourceData" hidden />
        <Form.Item label="数据来源" name="dataType">
          <Tabs
            className={styles.tab}
            size="small"
            onChange={(e) =>
              setImmer((draft) => {
                draft.active = e;
              })
            }
            activeKey={immer.active}
          >
            <Tabs.TabPane tab="url添加" key="url">
              <Form.Item noStyle name="url">
                <Input.TextArea
                  placeholder="请输入url"
                  autoSize={{ minRows: 6 }}
                  onChange={(e) => fetchData(e)}
                />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="文件上传" key="file">
              <Form.Item noStyle name="file">
                <UploadData />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Form.Item>
        {immer.fieldLists.length && immer.dataType ? (
          <div className={styles.fields}>
            <Form.Item name="x" label="经度">
              <Select
                size="small"
                style={{ width: 125, marginRight: 20 }}
                options={immer.fieldLists}
                placeholder="请选择"
              />
            </Form.Item>
            <Form.Item name="y" label="纬度">
              <Select
                size="small"
                style={{ width: 125 }}
                options={immer.fieldLists}
                placeholder="请选择"
              />
            </Form.Item>
          </div>
        ) : null}
        <Form.Item noStyle>
          <Button htmlType="submit" size="small" type="primary">
            添加
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const UploadData = () => {
    return (
      <Upload.Dragger
        name="file"
        accept=".json,.csv,.geojson"
        fileList={immer.fileList}
        multiple={false}
        maxCount={1}
        customRequest={customRequest}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上载</p>
        <p className="ant-upload-hint">只支持单个。严禁上传公司数据</p>
      </Upload.Dragger>
    );
  };

  return (
    <Modal open={open} title="新建图层" onCancel={setOpen}>
      <FormData />
    </Modal>
  );
}
