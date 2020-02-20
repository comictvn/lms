module Api
  module V1
    class Users::MeSerializer
      include FastJsonapi::ObjectSerializer

      attributes :id, :name, :email, :role

    end
  end
end
