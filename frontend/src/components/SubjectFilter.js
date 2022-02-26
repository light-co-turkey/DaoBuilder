import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WindowedSelect from "react-windowed-select";
import { createFilter } from 'react-select';
import SelectCustomOptions from "./ui/SelectCustomOption"
import { getCoingeckoList } from '../actions/paramActions';
import { setUserProps } from '../actions/userActions';
import { parseArrayFromLocal } from '../utils/basicUtils';
import { TextBtn } from './ui/Buttons';
import { selectStyles } from './ui/Styles';

const SubjectFilter = props => {
    const {  } = props
    
    const dispatch = useDispatch();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div className="df jc-c ai-c pb-2">
        <h4 className="dfc">
            <TextBtn variant="clear" disabled={user.props.selectedCoinChecks <= 0}
                onClick={() => {
                    dispatch(setUserProps({ field: "selectedCoinChecks", prop: [] }));
                    dispatch(setUserProps({ field: "coinChecksSelect", prop: [] }))
                }}>Reset</TextBtn>
            <i className="pbt-1">Search Coin's</i>
            <TextBtn variant="warning" onClick={() => window.confirm("Please Do not refresh if not needed, this is big data!!") ? dispatch(getCoingeckoList()) : null}>
                Update Coins
            </TextBtn>
        </h4>
        <WindowedSelect classNamePrefix="custom-select"
            filterOption={createFilter({ ignoreAccents: false })} components={{ Option: SelectCustomOptions }}
            styles={selectStyles} className="ml-3 mr-3 w-50" isMulti={true} closeMenuOnSelect={false} windowThreshold={"10"}
            value={coinChecksSelect} onChange={e => dispatch(setUserProps({ field: "coinChecksSelect", prop: e }))} options={parseArrayFromLocal("coinsList")} />
        <TextBtn variant="info" disabled={coinChecksSelect.length <= 0 || coinChecksSelect >= 20}
            onClick={() => getDetailedAsset(coinChecksSelect)}>Set</TextBtn>
    </div>);
};

export default SubjectFilter;
