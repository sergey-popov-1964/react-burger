import React, {useRef} from 'react';
import style from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardList from "../CardList/CardList";
import {useSelector} from "react-redux";
import {IItem} from "../../../../utils/interfaces";

type TIngredientsProps = {
  addItem: (item: IItem) => void,
}

const BurgerIngredients: React.FC<TIngredientsProps> = ({addItem}) => {

  const {ingredients, count} = useSelector((state: any) => state.burgerIngredient)
  const {bun} = useSelector((state: any) => state.burgerConstructor)

  const [current, setCurrent] = React.useState('Булки')
  const bunsRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const parentBlock = useRef<HTMLDivElement>(null)

  const handleTabs = () => {
    if (!parentBlock.current) return
    const topParentBlock = parentBlock.current.offsetTop;
    if (!bunsRef.current) return
    const bunsClientRect = bunsRef.current.getBoundingClientRect().top;
    if (!sauceRef.current) return
    const sauceClientRect = sauceRef.current.getBoundingClientRect().top;
    if (!mainRef.current) return
    const mainClientRect = mainRef.current.getBoundingClientRect().top;

    if (topParentBlock > bunsClientRect && topParentBlock <= sauceClientRect) {
      setCurrent('Булки')
    } else if (topParentBlock > sauceClientRect && topParentBlock <= mainClientRect) {
      setCurrent('Соусы')
    } else {
      setCurrent('Начинки')
    }
  }

  function handleClickOnTab(tab:string, ref:HTMLDivElement|null) {
    if (ref !== null) {
      setCurrent(tab);
      ref.scrollIntoView();
    }
    return null
  }

  return (
    <>
      <div className={style.block}>
        <p className={`${style.title} text text_type_main-large`}>
          Соберите бургер
        </p>
        <div style={{display: 'flex'}}>
          <Tab value="Булки" active={current === 'Булки'} onClick={() => handleClickOnTab('Булки', bunsRef.current)}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={() => handleClickOnTab('Соусы', sauceRef.current)}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={current === 'Начинки'}
               onClick={() => handleClickOnTab('Начинки', mainRef.current)}>
            Начинки
          </Tab>
        </div>

        <div className={style.ingredientList} ref={parentBlock} onScroll={handleTabs}>
          <div ref={bunsRef}>
            <CardList type="Булки"
                      items={ingredients.filter((item: IItem) => item.type === 'bun')}
                      addItem={addItem}
                      count={count}
                      bun={bun ? bun._id : null}
            />
          </div>
          <div ref={sauceRef}>
            <CardList type="Соусы"
                      items={ingredients.filter((item: IItem) => item.type === 'sauce')}
                      addItem={addItem}
                      count={count}
                      bun={bun ? bun._id : null}
            />
          </div>
          <div ref={mainRef}>
            <CardList type="Начинки"
                      items={ingredients.filter((item: IItem) => item.type === 'main')}
                      addItem={addItem}
                      count={count}
                      bun={bun ? bun._id : null}
            />
          </div>
        </div>
      </div>

    </>
  );
}

export default BurgerIngredients;
