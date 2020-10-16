<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Usd_jual extends ResourceController
{

    protected $format = 'json';
    protected $modelName = 'App\Models\Usd_model';

    public function create()
    {
        $mata_uang = $this->request->getPost('mata_uang');
        $jual_week = $this->request->getPost('jual_week');
        $jual_month = $this->request->getPost('jual_month');
        $jual_threemonth = $this->request->getPost('jual_threemonth');
        $jual_sixmonth = $this->request->getPost('jual_sixmonth');

        $data = [
            'mata_uang' => $mata_uang,
            'jual_week' => $jual_week,
            'jual_month' => $jual_month,
            'jual_threemonth' => $jual_threemonth,
            'jual_sixmonth' => $jual_sixmonth,
            'date_label' => date('Y-m-d H:i:s'),
            'date_created' => date('Y-m-d H:i:s'),
        ];
        $save = $this->model->insertUsd($data);
        if ($save) {
            $msg = ['message' => 'Created data success'];
            $response = [
                'status' => 200,
                'error' => false,
                'data' => $msg
            ];
            return $this->respond($response, 200);
        }

        $response = [
            'status' => 400,
            'error' => false,
            'data' => $save
        ];
        return $this->respond($response, 400);
    }

    public function index()
    {
        $result = $this->model->orderBy('id_usd', "DESC")
            ->findAll();
        return ($this->respond($result, 200));
    }

    public function edit($id = NULL)
    {
        $result = $this->model->getWhere(['id_usd' => $id])->getRowArray();
        if ($result) {
            $response = [
                'status' => 200,
                'error' => false,
                'data' => $result
            ];
            return $this->respond($response, 200);
        }
        $response = [
            'status' => 401,
            'error' => true,
            'data' => 'not found'
        ];
        return $this->respond($response, 401);
    }

    public function update($id = NULL)
    {
        $data = $this->request->getRawInput();
        $exec = $this->model->updateUsd($data, $id);
        if ($exec) {
            $response = [
                'status' => 200,
                'error' => false,
                'message' => 'Data updated'
            ];
            return $this->respond($response, 200);
        }
        $response = [
            'status' => 401,
            'error' => true,
            'data' => 'not found'
        ];
        return $this->respond($response, 401);
    }

    public function delete($id = null)
    {
        $exec = $this->model->deleteUsd($id);
        if ($exec) {
            $response = [
                'status' => 200,
                'error' => false,
                'message' => 'Data deleted'
            ];
            return $this->respond($response, 200);
        }
        $response = [
            'status' => 401,
            'error' => true,
            'data' => 'not found'
        ];
        return $this->respond($response, 401);
    }
}
