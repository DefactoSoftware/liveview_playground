defmodule LiveviewPlaygroundWeb.Home.IndexLive do
  use LiveviewPlaygroundWeb, :live_view

  alias LiveviewPlaygroundWeb.Home.IndexView

  def page_title, do: gettext("Liveview Playground - Home")

  def render(assigns) do
    IndexView.render("template.html", assigns)
  end

  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
