import React, { useMemo, useState } from 'react';
import './App.css';
import MyFilter from './UI/filter/MyFilter';
import TableItem from './components/TableItem';
import MyInput from './UI/input/MyInput';
import MyPagination from './UI/pagination/MyPagination';
import MySelect from './UI/select/MySelect';

function App() {
  //Массив элементов таблицы
  const [items] = useState ([
    {id:1, data: '01.09.2017', name: 'Spar', amount: '3', distance: '2500'},
    {id:2, data: '14.08.2011', name: 'Zara', amount: '2', distance: '1000'},
    {id:3, data: '23.10.2009', name: 'Colins', amount: '5', distance: '300'},
    {id:4, data: '02.06.2015', name: 'Nike', amount: '1', distance: '2300'},
    {id:5, data: '18.04.2019', name: 'Adidas', amount: '3', distance: '3000'},
    {id:6, data: '05.12.2020', name: 'Puma', amount: '2', distance: '200'},
    {id:7, data: '28.02.2016', name: 'Ozon', amount: '5', distance: '5000'},
    {id:8, data: '05.06.2018', name: 'Lamoda', amount: '1', distance: '2400'},
    {id:9, data: '24.09.2020', name: 'Rebook', amount: '3', distance: '6000'},
    {id:10, data: '18.09.2017', name: 'McDonalds', amount: '2', distance: '300'},
    {id:11, data: '28.02.2016', name: 'Magnit', amount: '15', distance: '100'},
    {id:12, data: '05.06.2018', name: 'Perectrestoc', amount: '8', distance: '300'},
    {id:13, data: '24.09.2020', name: 'Apple', amount: '2', distance: '6000'},
    {id:14, data: '18.09.2017', name: 'Mi', amount: '4', distance: '800'}
  ])

  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  //Последний элемент на странице:
  const lastItemsPage = currentPage * itemsPerPage
  // Первый элемент на странице
  const firstItemsPage = lastItemsPage - itemsPerPage

  //Сортировка элементов массива
  //Используем хук для оптимизации, чтобы функция не пересчитывалась при каждом изменении 
  const sortedItems = useMemo(() => {
    if(selectedSort === "name"){
    //Разворачиваем элементы в новый массив, и сортируем уже этот массив
      return [...items].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))
    }else{
      return [...items].sort((a,b) => a[selectedSort] - b[selectedSort])
    }
  }, [selectedSort, items])

  //Отсортированый и отфильтрованный массив
  // const sortedAndSearched = useMemo(() => {
  //   return sortedItems.filter(item => item.name.toLowerCase().includes(searchQuery))
  // }, [searchQuery,filter, sortedItems])

  const sortedAndSearched = useMemo(() => {
    if(filter){
      return sortedItems.filter(item => item[filter].toLowerCase().includes(searchQuery))
    }else{
      return sortedItems
    }
  }, [searchQuery, filter, sortedItems])

  //Текущие элементы, отображаемые на данной странице
  const currentItems = sortedAndSearched.slice(firstItemsPage, lastItemsPage)

  // Выбор способа сортировки
  const sortItems = (sort) => {
    setSelectedSort(sort)
  }

  const filtItems = (value) => {
    setFilter(value)
    console.log(value);
  }

  

  return (
    <div className="App">
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
        />

        <MyFilter
          value={filter}
          onChange={filtItems}
          defaultValue="Фильтрация по..."
          options = {[
            {value: 'name', name: 'Название'},
            {value: 'amount', name: 'Количество'},
            {value: 'distance', name: 'Расстояние'}
          ]}
        />

        <hr/>

        <MySelect
          value={selectedSort}
          onChange={sortItems}
          defaultValue="Сортировка по..."
          options = {[
              {value: 'name', name: 'По названию'},
              {value: 'amount', name: 'По количеству'},
              {value: 'distance', name: 'По расстоянию'}
          ]}  
        />
      </div>
      
      <table className="table">
	        <thead>
                <tr>
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Расстояние(м)</th>
                </tr>
	        </thead>
	        <tbody>
            {currentItems.map(item =>
              <TableItem item={item} key={item.id}/>
            )}
	        </tbody>
        </table>
        
        <MyPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={sortedAndSearched.length}
        />
    </div>
  );
}

export default App;
