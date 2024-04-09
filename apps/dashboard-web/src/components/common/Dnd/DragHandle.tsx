interface DragHandleProps {
  dragDivRef?: React.RefObject<HTMLDivElement>;
  handleDragStart?: () => void;
}

const ICON_MENU = '/icons/hamberger-menu.svg';

const DragHandle = ({ handleDragStart, dragDivRef }: DragHandleProps) => {
  return (
    <div
      className="h-full cursor-move hover:opacity-80"
      draggable
      onDragStart={(event) => {
        if (dragDivRef?.current) {
          event.dataTransfer.setDragImage(dragDivRef.current, 0, 0);
        }
        handleDragStart?.();
      }}
    >
      <img className="h-full cursor-move" src={ICON_MENU} />
    </div>
  );
};

export default DragHandle;
