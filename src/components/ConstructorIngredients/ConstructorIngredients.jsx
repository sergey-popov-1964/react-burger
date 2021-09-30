import React, {useRef} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import mark from '../../images/mark-item.svg'
import style from './ConstructorIngredients.modules.css'

function ConstructorIngredients({item, index, deleteItem, moveCards, id}) {

  const ref = useRef(null);
  const [{handlerId}, drop] = useDrop({
    accept: 'ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCards(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{}, drag] = useDrag({
    type: 'ingredient',
    item: () => {
      return {id, index};
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div ref={ref}
         data-handler-id={handlerId}
         className={style.itemsList}>
      <img className={style.itemMark} src={mark} alt="Метка"/>
      <ConstructorElement
        isLocked={false}
        handleClose={() => deleteItem(item)}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        key={item.index}
      />
    </div>

  );
}

export default ConstructorIngredients;
