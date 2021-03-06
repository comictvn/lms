module Api
  module V1
    class Assignments::ResultSerializer
      include FastJsonapi::ObjectSerializer

      attributes :id, :name, :description

      attributes :questions do |object|
        object.questions.map do |question|
          {
            id: question.id,
            name: question.name,
            description: question.description,
            answers: question.answers.map do |answer|
              {
                id: answer.id,
                description: answer.description,
                is_correct: answer.is_correct,
              }
            end
          }
        end
      end
    end
  end
end
