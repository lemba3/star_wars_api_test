import { Await, Link, useLoaderData, useParams } from "react-router-dom";
import { Suspense } from "react";
import { useQuery } from "react-query";

const PlanetDetailPage = () => {
  // const params = useParams();
  // const detailsList = [];
  // const {data, isLoading, err} = UseFetch(`https://swapi.dev/api/planets/${params.id}/`);
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
  // const data = useLoaderData();
  // return (
  //   <>
  //     <Suspense
  //       fallback={<div className="loader-container"><div className="loader"></div></div>}
  //     >
  //       <div className="container">
  //         <div className="some-space"></div>
  //         <Await
  //           resolve={data.res}
  //           errorElement={
  //             <p>Error fetching</p>
  //           }
  //         >
  //           {(res) => (
  //             Object.entries(res).map(([key, value]) => !exclusionList.includes(key) && (
  //               <div key={key} className="resource-detail"><span>{key.charAt(0).toUpperCase() + key.slice(1)}</span> : {value}</div>
  //             ))
  //           )}
  //         </Await>
  //         <div className="some-space"></div>
  //         <Link to={'/'}>Go Home</Link>
  //         <div className="some-space"></div>
  //       </div>
  //     </Suspense>
  //   </>
  // )
  const { id = '1' } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['planets/details', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/planets/${id}`);

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });

  if (isLoading) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>{String(error)}</p>
      </div>
    );
  }

  console.log("data ", data);

  return (
    <>
      <div className="container">
        <div className="some-space"></div>
        {Object.entries(data).map(([key, value]) => !exclusionList.includes(key) && (
          <div key={key} className="resource-detail"><span>{key.charAt(0).toUpperCase() + key.slice(1)}</span> : {value}</div>
        ))}
      </div>
    </>
  );
}

export default PlanetDetailPage
