defmodule LiveviewPlaygroundWeb.ViewHelpers do
  @moduledoc """
  Helpers that can be used in Cells and Views.
  """

  @doc """
  Translate variants to classnames.

  ## Examples

      iex> variants()
      "variant-default"

      iex> variants(:primary)
      "variant-primary"

      iex> variants("secondary")
      "variant-secondary"

      iex> variants([:secondary, :large])
      ["variant-secondary", "variant-large"]
  """
  def variants, do: variants(:default)
  def variants(nil), do: variants()

  def variants(variants) when is_list(variants) do
    variants
    |> Enum.map(&variants/1)
  end

  def variants(variant) when is_atom(variant) do
    variant
    |> Atom.to_string()
    |> variants()
  end

  def variants(variant) do
    variant
    |> String.replace_prefix("", "variant-")
  end
end
