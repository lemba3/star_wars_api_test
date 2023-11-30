import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const FilmDetailPage = () => {
  // const params = useParams();
  // const detailsList = [];
  // const {data, isLoading, err} = UseFetch(`https://swapi.dev/api/films/${params.id}/`);
  // const exclusionList = ['vehicles', 'films', 'homeworld', 'species', 'starships',
  // 'residents', 'characters', 'planets', 'people', 'pilots', 'created', 'edited', 'url'];

  // if(data != null){
  //   for (const [key, value] of Object.entries(data)) {
  //     detailsList.push({'key': key, 'value': value});
  //   }
  // }

  // return (
  //   !isLoading && !err ? <>
  //     {detailsList.map((item, i) => !exclusionList.includes(item.key) && (
  //       <div key={i} className="resource-detail"><span>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span> : {item.value}</div>
  //     ))}
  //   </>: !err ? <><div className="loader"></div></> : <>{err}</>
  // )
  const exclusionList = ['vehicles', 'films', 'homeworld', 'species', 'starships',
  'residents', 'characters', 'planets', 'people', 'pilots', 'created', 'edited', 'url'];
  const data = useLoaderData();
  return (
    <>
      <Suspense
        fallback={<div className="loader-container"><div className="loader"></div></div>}
      >
        <div className="container">
          <div className="some-space"></div>
          <Await
            resolve={data.res}
            errorElement={
              <p>Error fetching</p>
            }
          >
            {(res) => (
              Object.entries(res).map(([key, value]) => !exclusionList.includes(key) && (
                <div key={key} className="resource-detail"><span>{key.charAt(0).toUpperCase() + key.slice(1)}</span> : {value}</div>
              ))
            )}
          </Await>
          <div className="some-space"></div>
          <Link to={'/'}>Go Home</Link>
          <div className="some-space"></div>
        </div>
      </Suspense>
    </>
  )
}

export default FilmDetailPage
