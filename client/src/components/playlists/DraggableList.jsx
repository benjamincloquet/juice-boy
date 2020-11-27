/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { animated, useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import './DraggableList.css';

const itemHeight = 80;

const draggedSpringUpdate = (index, dragOffset) => ({
  top: index * itemHeight + dragOffset, immediate: true,
});

const basicSpringUpdate = (order) => (index) => ({
  top: order.indexOf(index) * itemHeight, immediate: false,
});

const springUpdate = (order, down, draggedItemOriginalIndex, draggedItemPreviousIndex, dragOffset) => (index) => (down && index === draggedItemOriginalIndex
  ? draggedSpringUpdate(draggedItemPreviousIndex, dragOffset)
  : basicSpringUpdate(order)(index));

const DraggableList = ({ children, onChangeOrder }) => {
  const order = useRef(children.map((child, index) => index));

  const [springs, setSprings] = useSprings(children.length, basicSpringUpdate(order.current));

  const setOrder = (newOrder) => {
    order.current = newOrder;
    onChangeOrder(newOrder);
  };

  const bind = useDrag(({ args: [draggedItemOriginalIndex], down, movement: [, dragOffset] }) => {
    const draggedItemPreviousIndex = order.current.indexOf(draggedItemOriginalIndex);
    const draggedItemNewIndex = clamp(Math.round((draggedItemPreviousIndex * itemHeight + dragOffset) / itemHeight), 0, children.length - 1);
    const newOrder = swap(order.current, draggedItemPreviousIndex, draggedItemNewIndex);
    setSprings(springUpdate(newOrder, down, draggedItemOriginalIndex, draggedItemPreviousIndex, dragOffset));
    if (!down) {
      setOrder(newOrder);
    }
  });

  return (
    <ul className="swappable-list" style={{ height: children.length * itemHeight }}>
      {children.map((child, childIndex) => (
        <animated.div className="swappable-list-item" key={childIndex} style={springs[childIndex]} {...bind(childIndex)}>
          {child}
        </animated.div>
      ))}
    </ul>
  );
};

DraggableList.propTypes = {
  children: PropTypes.node.isRequired,
  onChangeOrder: PropTypes.func.isRequired,
};

export default DraggableList;
