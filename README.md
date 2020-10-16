## Codeigniter 4 dengan react js

### INSTALLASI

1. Clone :
	https : https://github.com/nabilfiras93/codeigniter4_reactjs.git
	ssh : git@github.com:nabilfiras93/codeigniter4_reactjs.git
	github_cli : gh repo clone nabilfiras93/codeigniter4_reactjs

2. Buat (.env) file, letakkan setara dengan package.json dengan isi sbb :
   	#--------------------------------------------------------------------
	# ENVIRONMENT
	#--------------------------------------------------------------------

	CI_ENVIRONMENT = production
	#CI_ENVIRONMENT = development 

	#--------------------------------------------------------------------
	# DATABASE
	#--------------------------------------------------------------------

 	database.default.hostname = localhost
 	database.default.database = {nama_db}
 	database.default.username = root
 	database.default.password = 
 	database.default.DBDriver = MySQLi

3. Install packed node modules
   `npm install or yarn`
4. Import file sql pada database


### USE

- pastikan komputer running server dengan php versi 7. 
- buka direktori project, lalu running shell command didalam direktori project : `php spark serve`
	Ex : C:\xampp\htdocs\your_project_dir>  php spark serve 
- jika berhasil akan muncul : "CodeIgniter development server started on http://localhost:8080"
- Buka browser lalu running http://localhost:8080

