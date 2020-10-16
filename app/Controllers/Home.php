<?php namespace App\Controllers;

class Home extends BaseController
{
	public function kurs()
	{
		$p['content'] = view('kurs');
		$p['page_title'] = ' Kurs';
		return view("page_admin_full", $p);
	}

	public function kurs_erate()
	{
		$p['content'] = view('kurs_erate');
		$p['page_title'] = ' Kurs Erate';
		return view("page_admin_full", $p);
	}

	public function usd_jual()
	{
		$p['content'] = view('usd_jual');
		$p['page_title'] = ' USD Jual';
		return view("page_admin_full", $p);
	}

	//--------------------------------------------------------------------


}
