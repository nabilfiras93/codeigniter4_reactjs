<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Kurs extends ResourceController
{

    protected $format = 'json';
    protected $modelName = 'App\Models\Kurs_model';

    public function create()
    {
        $bank = $this->request->getPost('bank');
        $kurs_jual = $this->request->getPost('kurs_jual') ?? '';
        $kurs_beli = $this->request->getPost('kurs_beli') ?? '';

        $data = [
            'bank'      => $bank,
            'kurs_jual' => $kurs_jual,
            'kurs_beli' => $kurs_beli,
        ];
        $save = $this->model->insertKurs($data);
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
        $result = $this->model->orderBy('id_kurs', "DESC")
            ->findAll();
        return ($this->respond($result, 200));
    }

    public function edit($id = NULL)
    {
        $result = $this->model->getWhere(['id_kurs' => $id])->getRowArray();
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
        $exec = $this->model->updateKurs($data, $id);
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
        $exec = $this->model->deleteKurs($id);
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
