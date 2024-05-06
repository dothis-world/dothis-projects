import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

interface Props extends DropdownMenu.DropdownMenuContentProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  sideOffset?: number;
  arrow?: boolean;
}

const Dropdown = ({
  children,
  trigger,
  className,
  sideOffset = 0,
  side = 'bottom',
  arrow = false,
  ...props
}: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(
            'border-grey700 bg-grey00 flex flex-col rounded-md border p-2 shadow-md',
            className,
          )}
          side={side}
          sideOffset={sideOffset}
          {...props}
        >
          {arrow && <DropdownMenu.Arrow />}
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
