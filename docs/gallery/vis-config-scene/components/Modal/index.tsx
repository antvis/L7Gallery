import { CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import QueueAnim from 'rc-queue-anim';

interface ModalProps {
  width?: number;
  children: React.ReactElement;
  open?: boolean;
  title?: string | React.ReactElement;
  mask?: boolean;
  onCancel: (open: boolean) => void;
}

export function Modal(props: ModalProps) {
  const { width = 400, children, open = false, title = '', mask = true, onCancel } = props;
  return (
    <div
      className={styles['modal']}
      style={{
        display: open ? 'block' : 'none',
        background: mask ? 'rgba(0, 0, 0, 0.2)' : 'none',
        opacity: open ? 1 : 0,
      }}
    >
      <div className={styles['modal-wrap']} style={{ width }}>
        <QueueAnim key="modal" type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
          {open
            ? [
                <div className={styles['modal-wrap-header']} key="a">
                  <div className={styles['modal-wrap-header-title']}>{title}</div>
                  <CloseOutlined onClick={() => onCancel(false)} />
                </div>,
                <div style={{ padding: '16px 24px' }} key="b">
                  {children}
                </div>,
              ]
            : null}
        </QueueAnim>
      </div>
    </div>
  );
}
