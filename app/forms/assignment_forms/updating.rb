module AssignmentForms
  class Updating < Base
    def update
      if valid?
        create_assignment
      else
        raise(ExceptionHandler::Validation, errors.full_messages.join(', '))
      end
    end

    private
    def assignment
      @assignment ||= ::Assignment.find(id)
    end

    def create_assignment
      ActiveRecord::Base.transaction do
        assign_attributes
        assignment.user = current_user
        assignment.save!
      end
      assignment.reload
    end
  end
end
