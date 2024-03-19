import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

interface Props extends DropdownMenu.DropdownMenuContentProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  sideOffset?: number;
}

const Dropdown = ({
  children,
  trigger,
  className,
  sideOffset = 0,
  side = 'bottom',
  ...props
}: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(
            'flex flex-col rounded-md border border-grey700 bg-grey00 shadow-md',
            className,
          )}
          side={side}
          sideOffset={sideOffset}
          {...props}
        >
          <DropdownMenu.Arrow />
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
