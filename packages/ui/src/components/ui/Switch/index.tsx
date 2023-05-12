import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ChangeEvent,
} from 'react';
import { forwardRef, useState } from 'react';

import styles from './Switch.module.css';

type Props = {
  isDisabled?: boolean;
  ischecked?: boolean;
} & ComponentPropsWithoutRef<'label'>;

type Ref = ComponentRef<'label'>;

const Switch = forwardRef<Ref, Props>(
  ({ ischecked = false, isDisabled }, ref) => {
    const [checked, setChecked] = useState(ischecked);

    const onToggleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      console.log(checked);

      setChecked(checked);
    };

    return (
      <label className={styles.root} ref={ref}>
        <input
          disabled={isDisabled}
          type="checkbox"
          onChange={onToggleSwitch}
          checked={checked}
        />
      </label>
    );
  },
);

export default Switch;
