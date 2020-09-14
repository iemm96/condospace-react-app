import React, { useState} from "react";
import { TabContent, TabPane, NavItem, NavLink, Nav} from "reactstrap";
import classnames from 'classnames';
import CuotaTable from "../tables/CuotaTable";
import UnidadCuotaTable from "../tables/UnidadCuotaTable";

const Cuotas = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    return(
        <div className="mt-4">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' }) + ' gray'}
                        onClick={() => { toggle('1'); }}
                    >
                        Pago de Cuotas por Unidad
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' }) + ' gray'}
                        onClick={() => { toggle('2'); }}
                    >
                        Administrar Cuotas
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                   <UnidadCuotaTable/>
                </TabPane>
                <TabPane tabId="2">
                    <CuotaTable/>
                </TabPane>
            </TabContent>
        </div>
    );

};

export default Cuotas;
