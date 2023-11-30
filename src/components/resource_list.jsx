import useFetch from "./use_fetch";

const ResourceList = ({resource}) => {
  let resourceList = [];

  const {data, isLoading, err} = useFetch(`https://swapi.dev/api/${resource}/`);
  if(data != null) {
    resourceList = data.results;
  }
  return (
    !isLoading && !err ? <>
      {resourceList.map((item, i) => {
        const id = item.url
        .replace(`https://swapi.dev/api/${resource}/`, '')
        .replace('/', '');
        if(resource === 'films'){
          return (
            <div className='resource-content' key={i}><a href={`#${resource}?id=${id}`}>{i+1}.{item.title}</a></div>
          )
        }
        return (
          <div className='resource-content' key={i}><a href={`#${resource}?id=${id}`}>{i+1}.{item.name}</a></div>
        )
      })}
    </> : !err ? <>Loading...</> : <>{err}</>
  )
}

export default ResourceList
