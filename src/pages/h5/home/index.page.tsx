import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Toubu from './toubu';
import Zhj from './zhj';


type IProps = {
};

/**
 * 失物信息列表
 */
const Page: NextPage<IProps> = ({ }) => {
	return (
		<>
			<Head>
				<title>失物信息</title>
			</Head>
			<Toubu />
			<Zhj />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
