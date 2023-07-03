import React from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchForm({ handleSearch }) {
  return <Search onChange={handleSearch} allowClear placeholder="Type to search..." />
}

export default SearchForm
