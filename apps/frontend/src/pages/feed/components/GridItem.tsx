import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import invariant from 'tiny-invariant';

export const InstanceIdContext = createContext<symbol | null>(null);

const GridItem = ({ id, src }: { id: string; src: string }) => {
  const ref = useRef(null);
  const [state, setState] = useState<'idle' | 'dragging' | 'over'>('idle');
  const instanceId = useContext(InstanceIdContext);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: 'grid-item', id, src, instanceId }),
        onDragStart: () => setState('dragging'),
        onDrop: () => setState('idle')
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({ id, src }),
        getIsSticky: () => true,
        canDrop: ({ source }) =>
          source.data.instanceId === instanceId &&
          source.data.type === 'grid-item' &&
          source.data.src !== src,
        onDragEnter: () => setState('over'),
        onDragLeave: () => setState('idle'),
        onDrop: () => setState('idle')
      })
    );
  }, [instanceId, id, src]);

  const itemClassNames = {
    idle: 'transition-all duration-150 ease-in-out hover:bg-gray-700',
    dragging: 'grayscale',
    over: 'transform scale-110 rotate-6 brightness-125'
  };

  const handleContextMenu = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
  };

  return (
    <img
      ref={ref}
      src={src}
      alt="Post"
      className={`object-cover w-full h-full rounded ${itemClassNames[state]}`}
      onContextMenu={handleContextMenu}
    />
  );
};

export default memo(GridItem);
