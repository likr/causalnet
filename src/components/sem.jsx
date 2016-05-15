import React from 'react'
import SemVertex from './sem-vertex'
import SemEdge from './sem-edge'
import styles from './sem.css'

class Sem extends React.Component {
  render () {
    const {vertices, edges, attributes} = this.props
    return <div className={styles.sem}>
             <div className="pure-g">
               <div className="pure-u-1-2">
                 <div>
                   <svg className={styles.semNetwork}>
                     <g transform="translate(10,10)">
                       <g>
                         {edges.map((d) => (
                            <SemEdge key={`${d.u}:${d.v}`} {...d}/>
                          ))}
                       </g>
                       <g>
                         {vertices.map((d) => (
                            <SemVertex key={d.u} {...d}/>
                          ))}
                       </g>
                     </g>
                   </svg>
                 </div>
               </div>
               <div className="pure-u-1-2">
                 <div>
                   <table>
                     <thead>
                       <tr>
                         <th>
                           Name
                         </th>
                         <th>
                           Value
                         </th>
                       </tr>
                     </thead>
                     <tbody>
                       {attributes.map(({name, value}) => {
                          return <tr key={name}>
                                   <td>
                                     {name}
                                   </td>
                                   <td>
                                     {value.toFixed(3)}
                                   </td>
                                 </tr>
                        })}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           </div>
  }
}

export default Sem
