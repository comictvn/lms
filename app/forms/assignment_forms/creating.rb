module AssignmentForms
  class Creating < Base
    def create
      if valid?
        create_assignment
      else
        raise(ExceptionHandler::Validation, errors.full_messages.join(', '))
      end
    end

    private
    def assignment
      @assignment ||= ::Assignment.new
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
