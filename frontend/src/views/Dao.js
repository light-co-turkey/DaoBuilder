import React, { useState } from 'react';
import CreateDao from '../components/CreateDao';
import ListDaos from '../components/ListDaos';
import { ToggleSwitch, LinkTextBtn } from '../components/ui/Buttons';

const Dao = () => {
  const [count, setCount] = useState(3)

  let fieldList = [
    { text: "Find", count: 1, href: "" },
    { text: "View", count: 2, href: "" },
    { text: "Create", count: 3, href: "" }
  ]

  return (
    < div className="dfc ai-c" style={{ minHeight: "calc(100vh - 15rem)"}}>
      <ToggleSwitch onSwitch={setCount} value={count} className="h-2 w-80 ml-3 mxw-400" fieldList={fieldList} />
      {count !== 1 ? null : <ListDaos/>}
      {count !== 2 ? null : null}
      {count !== 3 ? null : <CreateDao />}
    </div >)
};

export default Dao;