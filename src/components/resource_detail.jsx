import useFetch from "./use_fetch"

const ResourceDetail = ({resource, id}) => {

  const detailsList = [];
  const {data, isLoading, err} = useFetch(`https://swapi.dev/api/${resource}/${id}/`);
  const exclusionList = ['vehicles', 'films', 'homeworld', 'species', 'starships',
  'residents', 'characters', 'planets', 'people', 'pilots', 'created', 'edited', 'url'];

  if(data != null){
    for (const [key, value] of Object.entries(data)) {
      detailsList.push({'key': key, 'value': value});
    }
  }

  return (
    !isLoading && !err ? <>
      {detailsList.map((item, i) => !exclusionList.includes(item.key) && (
        <div key={i} className="resource-detail"><span>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span> : {item.value}</div>
      ))}
    </>: !err ? <>Loading...</> : <>{err}</>
  )
}

export default ResourceDetail
