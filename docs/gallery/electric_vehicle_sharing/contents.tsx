import React from 'react';
import { Badge } from 'antd';
import Icon from '@ant-design/icons';
import styles from './index.module.less';

const TotalIcon = () => {
  return (
    <svg
      style={{
        width: ' 1em',
        height: '1em',
        verticalAlign: 'middle',
        fill: 'currentColor',
        overflow: 'hidden',
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="523"
    >
      <path
        d="M490.666667 533.333333v256a64 64 0 0 1-64 64h-192a64 64 0 0 1-64-64v-192a64 64 0 0 1 64-64h256z m298.666666 0a64 64 0 0 1 64 64v192a64 64 0 0 1-64 64h-192a64 64 0 0 1-64-64V533.333333h256z m-362.666666 64h-192v192h192v-192z m362.666666 0h-192v192h192v-192zM426.666667 170.666667a64 64 0 0 1 64 64v256H234.666667a64 64 0 0 1-64-64v-192a64 64 0 0 1 64-64h192z m266.666666 0a160 160 0 1 1 0 320 160 160 0 0 1 0-320zM426.666667 234.666667h-192v192h192v-192z m266.666666 0a96 96 0 1 0 0 192 96 96 0 0 0 0-192z"
        p-id="524"
      ></path>
    </svg>
  );
};

const MoreParkingIcon = () => {
  return (
    <svg
      style={{
        width: ' 1em',
        height: '1em',
        verticalAlign: 'middle',
        fill: 'currentColor',
        overflow: 'hidden',
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="34563"
    >
      <path
        d="M224 368c26.496 0 48 21.568 48 48S250.496 464 224 464 176 442.496 176 416 197.504 368 224 368M224 320C170.944 320 128 363.008 128 416S170.944 512 224 512 320 469.056 320 416 277.056 320 224 320L224 320zM480 112c26.496 0 48 21.568 48 48S506.496 208 480 208 432 186.496 432 160 453.504 112 480 112M480 64C426.944 64 384 107.008 384 160S426.944 256 480 256 576 213.056 576 160 533.056 64 480 64L480 64zM928 240c26.496 0 48 21.568 48 48s-21.504 48-48 48-48-21.568-48-48S901.504 240 928 240M928 192C875.008 192 832 235.008 832 288S875.008 384 928 384 1024 341.056 1024 288 980.992 192 928 192L928 192zM608 368c26.496 0 48 21.568 48 48S634.496 464 608 464 560 442.496 560 416 581.504 368 608 368M608 320C554.944 320 512 363.008 512 416S554.944 512 608 512C660.992 512 704 469.056 704 416S660.992 320 608 320L608 320zM480 688c26.496 0 48 21.632 48 48 0 26.496-21.504 48-48 48s-48-21.504-48-48C432 709.632 453.504 688 480 688M480 640C426.944 640 384 683.008 384 736S426.944 832 480 832 576 788.992 576 736 533.056 640 480 640L480 640zM160 752c26.496 0 48 21.632 48 48 0 26.496-21.504 48-48 48s-48-21.504-48-48C112 773.632 133.504 752 160 752M160 704C106.944 704 64 747.008 64 800S106.944 896 160 896 256 852.992 256 800 213.056 704 160 704L160 704z"
        p-id="34564"
      ></path>
    </svg>
  );
};

const LessParkingIcon = () => {
  return (
    <svg
      style={{
        width: '1em',
        height: '1em',
        verticalAlign: 'middle',
        fill: 'currentColor',
        overflow: 'hidden',
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="12049"
    >
      <path
        d="M704 928a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m-336-192a80 80 0 1 1 0-160 80 80 0 0 1 0 160z m-96-288a112 112 0 1 1 0-224 112 112 0 0 1 0 224zM736 352a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
        p-id="12050"
      ></path>
    </svg>
  );
};

const ViolationsParkingIcon = () => {
  return (
    <svg
      style={{
        width: '1em',
        height: '1em',
        verticalAlign: 'middle',
        fill: 'currentColor',
        overflow: 'hidden',
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="32889"
    >
      <path
        d="M512 938.666667a426.666667 426.666667 0 1 1 0-853.333334 426.666667 426.666667 0 0 1 0 853.333334zM512 853.333333A341.333333 341.333333 0 1 0 512 170.666667a341.333333 341.333333 0 0 0 0 682.666666zM363.633778 303.331556l357.034666 357.034666a257.706667 257.706667 0 0 1-60.302222 60.302222L303.331556 363.633778a257.706667 257.706667 0 0 1 60.302222-60.302222z"
        p-id="32890"
      ></path>
    </svg>
  );
};

const LowPowerIcon = () => {
  return (
    <svg
      style={{
        width: '1em',
        height: '1em',
        verticalAlign: 'middle',
        fill: 'currentColor',
        overflow: 'hidden',
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="13838"
    >
      <path
        d="M789.333333 213.333333h-682.666666C46.933333 213.333333 0 260.266667 0 320v384C0 763.733333 46.933333 810.666667 106.666667 810.666667h682.666666c59.733333 0 106.666667-46.933333 106.666667-106.666667v-384C896 260.266667 849.066667 213.333333 789.333333 213.333333z m21.333334 490.666667c0 12.8-8.533333 21.333333-21.333334 21.333333h-682.666666c-12.8 0-21.333333-8.533333-21.333334-21.333333v-384c0-12.8 8.533333-21.333333 21.333334-21.333333h682.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v384z"
        p-id="13839"
      ></path>
      <path
        d="M204.8 384c-25.6 0-42.666667 17.066667-42.666667 42.666667v170.666666c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666667-42.666667v-170.666666c0-25.6-17.066667-42.666667-42.666667-42.666667zM981.333333 384h-42.666666v256h42.666666c25.6 0 42.666667-17.066667 42.666667-42.666667v-170.666666c0-25.6-17.066667-42.666667-42.666667-42.666667z"
        p-id="13840"
      ></path>
    </svg>
  );
};

const FaultVehicleIcon = () => {
  return (
    <svg
      style={{
        width: '1em',
        height: '1em',
        verticalAlign: 'middle',
        fill: 'currentColor',
        overflow: 'hidden',
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="14667"
    >
      <path
        d="M545.294336 168.58112c-14.08-24.387584-37.12-24.387584-51.2 0L136.689664 787.61984c-14.08 24.385536-2.56 44.3392 25.6 44.3392L877.09696 831.95904c28.16 0 39.68-19.953664 25.6-44.3392L545.294336 168.58112zM518.516736 346.085376c11.206656 0 20.641792 0.589824 20.641792 11.79648 0 8.84736-1.767424 23.003136-3.538944 47.775744-5.89824 69.597184-8.96 164.10624-8.96 164.10624-0.91136 28.145664-3.782656 51.970048-6.375424 52.944896 0 0 0 0-1.767424 0-1.769472 0-1.769472 0-1.769472 0-1.622016-0.974848-3.7888-24.793088-4.814848-52.936704 0 0-3.444736-94.517248-8.751104-164.114432-2.359296-24.772608-3.540992-38.926336-3.540992-47.775744C499.64032 346.6752 509.667328 346.085376 518.516736 346.085376zM519.694336 736.370688c-16.308224 0-29.526016-13.217792-29.526016-29.526016 0-16.304128 13.217792-29.523968 29.526016-29.523968 16.304128 0 29.523968 13.21984 29.523968 29.523968C549.218304 723.152896 535.998464 736.370688 519.694336 736.370688z"
        p-id="14668"
      ></path>
    </svg>
  );
};

export const SELECT_TYPE = {
  ALL: 'ALL',
  BIKEAVAILABILITY: 'bikeAvailability',
  BIKEUNAVAILABILITY: 'bikeUnAvailability',
  POINTZONEMORE: 'pointZoneMore',
  POINTZONELESS: 'pointZoneLess',
  BICKILLEGALPARKING: 'bikeIllegalParking',
  BICKLOWERPOWER: 'bikeLowpower',
  BICKTHEFAULT: 'bikeTheFault',
};

export const tabList = [
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <Icon style={{ color: 'rgba(0,0,0,1)', marginRight: 5 }} component={TotalIcon} />
        总分布
      </span>
    ),
    key: SELECT_TYPE.ALL,
    children: (onChangeType: (str: string) => void, selectType: string | undefined) => (
      <div>
        <li
          onClick={() => onChangeType(SELECT_TYPE.POINTZONEMORE)}
          className={
            selectType === SELECT_TYPE.POINTZONEMORE
              ? styles['electric_vehicle_sharing_selected-item']
              : ''
          }
        >
          <Icon style={{ color: 'rgba(0,0,0,1)' }} component={MoreParkingIcon} />
          车辆过多的停放点
        </li>
        <li
          onClick={() => onChangeType(SELECT_TYPE.POINTZONELESS)}
          className={
            selectType === SELECT_TYPE.POINTZONELESS
              ? styles['electric_vehicle_sharing_selected-item']
              : ''
          }
        >
          <Icon style={{ color: 'rgba(0,0,0,1)' }} component={LessParkingIcon} />
          车辆过少的停放点
        </li>
      </div>
    ),
  },
  {
    label: (
      <span>
        <Badge status="processing" />
        可用车
      </span>
    ),
    key: SELECT_TYPE.BIKEAVAILABILITY,
    children: (onChangeType: (str: string) => void, selectType: string | undefined) => (
      <div>
        <li
          onClick={() => onChangeType(SELECT_TYPE.BICKILLEGALPARKING)}
          className={
            selectType === SELECT_TYPE.BICKILLEGALPARKING
              ? styles['electric_vehicle_sharing_selected-item']
              : ''
          }
        >
          <Icon style={{ color: 'rgba(0,0,0,1)' }} component={ViolationsParkingIcon} />
          违规停放的车辆
        </li>
      </div>
    ),
  },
  {
    label: (
      <span>
        <Badge status="error" />
        不可用车
      </span>
    ),
    key: SELECT_TYPE.BIKEUNAVAILABILITY,
    children: (onChangeType: (str: string) => void, selectType: string | undefined) => (
      <div>
        <li
          onClick={() => onChangeType(SELECT_TYPE.BICKLOWERPOWER)}
          className={
            selectType === SELECT_TYPE.BICKLOWERPOWER
              ? styles['electric_vehicle_sharing_selected-item']
              : ''
          }
        >
          <Icon style={{ color: 'rgba(0,0,0,1)' }} component={LowPowerIcon} />
          电量低的车辆
        </li>
        <li
          onClick={() => onChangeType(SELECT_TYPE.BICKTHEFAULT)}
          className={
            selectType === SELECT_TYPE.BICKTHEFAULT
              ? styles['electric_vehicle_sharing_selected-item']
              : ''
          }
        >
          <Icon style={{ color: 'rgba(0,0,0,1)' }} component={FaultVehicleIcon} />
          故障车辆
        </li>
      </div>
    ),
  },
];

export const pointLayerStyle = {
  autoFit: true,
  shape: 'circle',
  color: 'blue',
};

export const choroplethLayerStyle = {
  autoFit: true,
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 1,
};
