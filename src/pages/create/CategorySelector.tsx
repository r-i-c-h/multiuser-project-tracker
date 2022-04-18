import Select from 'react-select';

type TCategory = { value: string; label: string; };
const categoryOptions: TCategory[] = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

interface ICategorySelector {
  selectedCategory: TCategory | null;
  setSelectedCategory: (value: TCategory | null) => void
}

export default function CategorySelector({ selectedCategory, setSelectedCategory }: ICategorySelector) {
  return (<>
    <label> <span>Project Category:</span>
      <Select
        aria-required="true"
        defaultValue={selectedCategory}
        placeholder="Select  Department..."
        onChange={(options) => { setSelectedCategory(options) }}
        options={categoryOptions}
      />
    </label>
  </>)
}