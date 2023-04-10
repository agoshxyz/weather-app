import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'

export default function SearchInput ({ onPlaceChanged }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      headers: { 'X-Api-Key': import.meta.env.VITE_MAPS_API_KEY }
    },
    debounce: 300
  })
  const handleInput = e => {
    setValue(e.target.value)
  }
  const handleSelect = async description => {
    setValue(description, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address: description })
      const { lat, lng } = getLatLng(results[0])
      onPlaceChanged(lat, lng)
    } catch (error) {
      console.error('Error: ', error)
    }
  }
  const renderSuggestions = () => {
    if (data && data.length) {
      return (
        <div className='absolute top-full mt-2 bg-white rounded-md shadow-lg z-10'>
          {data.map(suggestion => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text }
            } = suggestion
            return (
              <li
                key={place_id}
                onClick={() => handleSelect(main_text)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 w-80 md:w-96  ${
                  data.slice(-1)[0].place_id !== place_id && 'border-b'
                }`}
              >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }
  return (
    <div className='relative'>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder='Search for any city'
        title='Search for any address'
        className='border w-80 md:w-96 mr-2 py-1 pl-4 pr-10 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-300'
      />
      <ul className=''>{status === 'OK' && renderSuggestions()}</ul>
    </div>
  )
}
