import React from 'react'
import { Input } from 'antd'

const { Search } = Input

// class SearchForm extends Component {
//   constructor() {
//     super()
//     this.state = {
//       search: '',
//     }
//   }

//   render() {
//     return (
//       <form className="form" action="">
//         <input
//           className="search-form"
//           placeholder="Type to search..."
//           type="text"
//           name="query"
//           value={this.state.search}
//           onChange={(event) => {
//             this.setState({ search: event.target.value })
//           }}
//           // onSubmit={this.handleSearchRequest}
//           onKeyUp={() => this.props.handleChange(this.state.search)}
//         />
//       </form>
//     )
//   }
// }

function SearchForm({ handleSearch }) {
  return <Search onChange={handleSearch} allowClear placeholder="Type to search..." />
}

export default SearchForm
