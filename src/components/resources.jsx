import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

const Resources = () => {

  // const { data, isLoading, err} = useLoaderData();
  const data = useLoaderData();
  // const arr= [];
  // if(data != null){
  //   for (const [key] of Object.entries(data)) {
  //     arr.push(key);
  //   }
  // }

  // console.log(arr)

  // return (
  //   !isLoading && !err ? <div className="container">
  //     <div className="resources">
  //       <h4>Select any to view</h4>
  //         <div className="some-space">
  //           {arr.map((item, i) => (
  //             <div key={i}>
  //               <Link to={item}>{i+1}.{item}</Link>
  //             </div>
  //           ))}
  //         </div>
  //     </div>
  //   </div>: !err ? <div className="container"><>Loading...</></div> : <div className="container"><>{err}</></div>
  // )

  // return (
  //   <div className="container">
  //     <div className="resources">
  //       <h4>Select any to view</h4>
  //         <div className="some-space">
  //           {arr.map((item, i) => (
  //             <div key={i}>
  //               <Link to={item}>{i+1}.{item}</Link>
  //             </div>
  //           ))}
  //         </div>
  //     </div>
  //   </div>
  // )

  return (
    <>
      <Suspense
        fallback={<div className="container">Loading...</div>}
      >
        <div className="container">
          <div className="resources">
            <h4>Select any to view</h4>
            <div className="some-space"></div>
            <Await
              resolve={data.res}
              errorElement={
                <p>Error fetching</p>
              }
            >
              {(res) => (
                Object.keys(res).map((item, i) => (
                  <div key={i}>
                    <Link to={item}>{i+1}.{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                  </div>
                ))
              )}
            </Await>
          </div>
          <div className="some-space"></div>
        </div>
      </Suspense>
    </>
  )

}

export default Resources
