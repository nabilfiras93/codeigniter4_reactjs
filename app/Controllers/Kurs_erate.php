<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Kurs_erate extends ResourceController
{

    protected $format = 'json';
    protected $modelName = 'App\Models\Kurse_model';

    public function create()
    {
        $erate_beli = $this->request->getPost('erate_beli') ?? '';
        $erate_jual = $this->request->getPost('erate_jual') ?? '';
        $ttcounter_beli = $this->request->getPost('ttcounter_beli') ?? '';
        $ttcounter_jual = $this->request->getPost('ttcounter_jual') ?? '';

        $data = [
            'erate_beli'      => $erate_beli,
            'erate_jual'      => $erate_jual,
            'ttcounter_beli' => $ttcounter_beli,
            'ttcounter_jual' => $ttcounter_jual,
        ];
        $save = $this->model->insertKursE($data);
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
        $exec = $this->model->updateKursE($data, $id);
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
        $exec = $this->model->deleteKursE($id);
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
