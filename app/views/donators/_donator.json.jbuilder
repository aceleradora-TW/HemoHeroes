json.extract! donator, :id, :name, :date_birth, :cpf, :street, :district, :number, :city, :state, :cep, :email, :phone, :password, :blood_type, :admin, :receive_notification, :last_donation, :created_at, :updated_at
json.url donator_url(donator, format: :json)