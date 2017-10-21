/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React  from 'react';
import styles from './index.less';
import config from '../../utils/config';

const Footer = () => (
  <div className={styles.footer}>
    {config.footerText}
  </div>
)

export default Footer
