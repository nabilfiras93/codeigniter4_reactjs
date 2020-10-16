<?php namespace App\Models;

use CodeIgniter\Model;

class GlobalModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_result($select, $table, $where = array(), $order=null, $group=null, $lastQuery=false)
    {
        $builder = $this->db->table($table);
        if($select){
            $builder->select($select);
        }
        if($where){
            $builder->where($where);
        }
        if($order){
            $builder->orderBy($order);
        }
        if($group){
            $builder->groupBy($group);
        }
        if($lastQuery == true){
            var_dump ($builder->getCompiledSelect());
            die();
        }
        $q = $builder->get();

        if ($builder->countAll() > 0) {
            return $q->getResult();
        }
        return false;
    }

    public function get_row($select, $table, $where = array(), $order=null, $group=null, $lastQuery=false)
    {
        $builder = $this->db->table($table);
        if($select){
            $builder->select($select);
        }
        if($where){
            $builder->where($where);
        }
        if($order){
            $builder->orderBy($order);
        }
        if($group){
            $builder->groupBy($group);
        }
        if($lastQuery == true){
            var_dump ($builder->getCompiledSelect());
            die();
        }
        $q = $builder->get();

        if ($builder->countAll() > 0) {
            return $q->getRow();
        }
        return false;
    }

    public function db_insert($table, $data, $lastQuery=false)
    {
        $builder = $this->db->table($table)->insert($data);
        if($lastQuery == true){
            var_dump ($builder->getCompiledSelect());
            die();
        }
        if($builder){
            return $this->db->insertID();
        }
        return false;
    }

    public function db_update($table, $data, $where, $lastQuery=false)
    {
        $builder = $this->db->table($table)->update($data, $where);
        if($lastQuery == true){
            var_dump ($builder->getCompiledSelect());
            die();
        }
        if($builder){
            return true;
        }
        return false;
    }

}
