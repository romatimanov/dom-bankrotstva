export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '0.5px solid #BAB6B6',
    boxShadow: 'none',
    fontSize: '14px',
    width: '240px',
    padding: '10px 16px',
    cursor: 'pointer'
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#CECBCB',
    fontSize: '14px'
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#BAB6B6'
  }),
  indicatorSeparator: () => ({ display: 'none' })
}
