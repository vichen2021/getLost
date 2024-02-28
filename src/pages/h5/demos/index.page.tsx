import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Top from './top';
import Mid from './mid';
import Toubu from '../home/toubu';
import apiH5DemosXzwp, { Message as M1, Result as R1 } from '../../api/h5/demos/xzwp';
type IProps = {
};

/**
 * Demos
 */
const Page: NextPage<IProps> = () => {
	const [files, setfiles] = useState([] as string[]);
	return (
		<>
			<Head>
				<title>Demos</title>
			</Head>
			<Toubu />
			<Mid initData={{} as M1} />


		</>
	);
};


export default Page;
