import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

interface Props extends DropdownMenu.DropdownMenuContentProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  arrow?: boolean;
}

const DropdownSub = ({
  children,
  trigger,
  className,
  sideOffset = 2,
  alignOffset = -5,
  side = 'right',
  arrow = false,
  ...props
}: Props) => {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>{trigger}</DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(
            'border-grey700 bg-grey00 flex flex-col rounded-md border shadow-md',
            className,
          )}
          side={side}
          {...props}
        >
          {arrow && <DropdownMenu.Arrow />}
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};

export default DropdownSub;
