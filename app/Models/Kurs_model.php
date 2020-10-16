<?php

namespace App\Models;

use CodeIgniter\Model;

class Kurs_model extends Model
{
    protected $table      = 'kurs';

    public function insertKurs($data)
    {
        return $this->db->table($this->table)->insert($data);
    }

    public function updateKurs($data, $id)
    {
        return $this->db->table($this->table)->update($data, ['id_kurs' => $id]);
    }

    public function deleteKurs($id)
    {
        return $this->db->table($this->table)->delete(['id_kurs' => $id]);
    }
}
