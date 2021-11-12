import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import mark from '../../../../images/mark-item.svg'
import style from './ConstructorIngredients.module.css'
import {IItem} from "../../../../utils/interfaces"

type TConstructorProps = {
  item: IItem,
  index: number,
  deleteItem: (ingredientID: string|undefined, _id: string) => void,
  moveCards: (dragIndex: number, hoverIndex: number) => void,
  id: string
}

const ConstructorIngredients: React.FC<TConstructorProps> = ({item, index, deleteItem, moveCards, id}) => {

  const ref = React.useRef<HTMLDivElement>(null);
  const [{handlerId}, drop] = useDrop({
    accept: 'Ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
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
      if (!clientOffset) return;
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
    type: 'Ingredient',
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
        handleClose={() => deleteItem(item.ingredientID, item._id)}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        key={item.index}
      />
    </div>
  );
}

export default ConstructorIngredients;
