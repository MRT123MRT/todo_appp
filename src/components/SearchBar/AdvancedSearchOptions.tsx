import SearchFilter from "../../models/SearchFilter"

export default function AdvancedSearchOptions({ filter, setFilter }: { filter: SearchFilter, setFilter: (filter: SearchFilter) => void }) {

    return <div style={{
      width: "90%", // NO MORE INLINE CSS. IF I SEE ONE LINE OF INLINE CSS YOU ARE NOT PASSING THIS SHIT
      maxWidth: 800,
      display: 'flex',
      boxSizing: 'border-box',
    }}>
  
      <FilterByCompletionSettings filter={filter} setFilter={setFilter} />
  
    </div>
  
  }
  
type Props = { filter: SearchFilter, setFilter: (filter: SearchFilter) => void }


const FilterByCompletionSettings: React.FC<Props> = ({ filter, setFilter }) => { // TRANSFORM ALL YOUR REACT COMPONENTS TO LOOK LIKE THIS AND USE TYPES LIKE THIS
  
    return <div style={{
      display: 'flex',
      backgroundColor: 'white',
      border: '1px solid #bbb',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: "8px 14px",
      marginRight: 10,
    }}>
  
      Show
  
      <select
  
        onChange={(e) => {
          setFilter({
            ...filter,
            filter: e.target.value as SearchFilter['filter']
          })
        }}
  
        style={{
          margin: "0px 0.3rem",
          border: '0px solid #ccc',
          borderRadius: 5,
          padding: "0px 0px",
          boxSizing: 'border-box',
          width: "auto",
          fontSize: "1rem",
          fontWeight: 500,
          outline: 'none',
          backgroundColor: '#eee',
        }}>
        <option value="all">All</option>
        <option value="active">only active</option>
        <option value="completed">only completed</option>
      </select>
  
      todos
    </div>
  }