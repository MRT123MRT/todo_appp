import SearchFilter from "../../models/SearchFilter"
import '../../App.css'

type AdvancedSearchOptionsProps = { filter: SearchFilter, setFilter: (filter: SearchFilter) => void }

const AdvancedSearchOptions: React.FC<AdvancedSearchOptionsProps> = ({ filter, setFilter }) => {

  return <div className="filter ">

    <FilterByCompletionSettings filter={filter} setFilter={setFilter} />

  </div>

}

type Props = { filter: SearchFilter, setFilter: (filter: SearchFilter) => void }


const FilterByCompletionSettings: React.FC<Props> = ({ filter, setFilter }) => { // TRANSFORM ALL YOUR REACT COMPONENTS TO LOOK LIKE THIS AND USE TYPES LIKE THIS

  return <div className="chosefilter">

    Show

    <select className="selectfilter"

      onChange={(e) => {
        setFilter({
          ...filter,
          filter: e.target.value as SearchFilter['filter']
        })
      }}
    >
      <option value="all">All</option>
      <option value="active">only active</option>
      <option value="completed">only completed</option>
    </select>

    todos
  </div>
}

export default AdvancedSearchOptions