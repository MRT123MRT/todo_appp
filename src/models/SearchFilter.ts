type SearchFilter = {
    generalSearch: string
    filter: 'all' | 'active' | 'completed'
    filteringEnabled: boolean
}
export default SearchFilter;