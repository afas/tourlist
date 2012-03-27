# coding: utf-8

class OnlinaFormBuilder < ActionView::Helpers::FormBuilder
  # A list of fields we want to decorate
  helpers = field_helpers +
            %w(date_select datetime_select time_select) +
            %w(collection_select select country_select time_zone_select) -
            %w(hidden_field label fields_for)

  helpers.each do |name|
    define_method(name) do |field, *args|
      options = args.extract_options!

      # Delete the extra options and clean up the options array
      label = options.delete(:label)
      no_align = options.delete(:no_align)

      if no_align
        @template.content_tag(:div) do
          label(field, label) + ':' + mark(field) + super
        end
      else
        @template.content_tag(:dl) do
          field_label = @template.content_tag(:dt, label(field, label) + ':' + mark(field))
          field_label << @template.content_tag(:dd, super)
          field_label << @template.content_tag(:de, 'Обязательное поле') if has_errors?(field)
          field_label
        end
      end

    end
  end

  # Private Area
  private
    def has_errors?(field_name)
        object.errors.invalid? field_name
    end

    def mark(field_name)
      validation_types = @object.class.validators_on(field_name).map(&:class)
      if validation_types.include? ActiveModel::Validations::PresenceValidator
        @template.content_tag(:span, ' *', :class => 't_red')
      end
    end
end