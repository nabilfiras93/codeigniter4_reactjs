<?php

namespace App\Models;

use CodeIgniter\Model;

class Usd_model extends Model
{
    protected $table      = 'usd_jual';

    public function insertUsd($data)
    {
        return $this->db->table($this->table)->insert($data);
    }

    public function updateUsd($data, $id)
    {
        return $this->db->table($this->table)->update($data, ['id_usd' => $id]);
    }

    public function deleteUsd($id)
    {
        return $this->db->table($this->table)->delete(['id_usd' => $id]);
    }
}
