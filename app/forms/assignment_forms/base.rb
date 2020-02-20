module AssignmentForms
  ASSIGNMENT_COLUMNS = ::Assignment.column_names.map(&:to_sym)
  QUESTION_COLUMNS = ::Question.column_names.map(&:to_sym)
  ANSWERS_COLUMNS = ::Answer.column_names.map(&:to_sym)

  class Base
    include Virtus.model
    include ActiveModel::Validations

    class Answer < Base
      attribute :id, Integer
      attribute :description, String
      attribute :is_correct, Boolean
    end

    class Question < Base
      attribute :id, Integer
      attribute :name, String
      attribute :description, String
      attribute :answers, Array[Answer], default: []
    end

    attribute :id, Integer
    attribute :name, String
    attribute :description, String
    attribute :current_user, User
    attribute :questions, Array[Question], default: []

    validate :at_least_one_question
    validate :at_least_one_answer 

    private
    def assignment
      fail NotImplementedError
    end

    def assign_attributes
      assignment.assign_attributes(self.attributes.slice(*ASSIGNMENT_COLUMNS).except(:id))
      assignment.questions = build_questions
    end

    # Builder Association
    def build_questions
      @build_questions ||= begin
        questions.map do |question|
          model = ::Question.find_or_initialize_by(id: question.id)
          model.assign_attributes(question.attributes.slice(*QUESTION_COLUMNS))
          model.answers = build_answers(question)
          model.save! if question.id.present?
          model
        end
      end
    end

    def build_answers(question)
      question.answers.map do |answer|
        model = ::Answer.find_or_initialize_by(id: answer.id)
        model.assign_attributes(answer.attributes.slice(*ANSWERS_COLUMNS))
        model.save! if answer.id.present?
        model
      end
    end

    # Validations
    def at_least_one_question
      errors.add(:base, "Select at least one question, please!") if questions.size.zero?
    end

    def at_least_one_answer
      questions.each_with_index do |question, index|
        if question.answers.size.zero?
          errors.add(:base, "Select at least one answer for Q #{index + 1}, please!") 
          break
        end

        total_correct_answer = question.answers.select { |answer| answer.is_correct }
        if total_correct_answer.size.zero?
          errors.add(:base, "Select at least one correct answer for Q #{index + 1}, please!") 
          break
        end
      end
    end
  end
end
