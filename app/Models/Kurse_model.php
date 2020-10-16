<?php

namespace App\Models;

use CodeIgniter\Model;

class Kurse_model extends Model
{
    protected $table      = 'kurs_erate';

    public function insertKursE($data)
    {
        return $this->db->table($this->table)->insert($data);
    }

    public function updateKursE($data, $id)
    {
        return $this->db->table($this->table)->update($data, ['id_kurs' => $id]);
    }

    public function deleteKursE($id)
    {
        return $this->db->table($this->table)->delete(['id_kurs' => $id]);
    }
}
