defmodule LiveviewPlaygroundWeb do
  @moduledoc """
  The entrypoint for defining your web interface, such
  as controllers, views, channels and so on.

  This can be used in your application as:

      use LiveviewPlaygroundWeb, :controller
      use LiveviewPlaygroundWeb, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below. Instead, define any helper function in modules
  and import those modules here.
  """

  def controller do
    quote do
      use Phoenix.Controller, namespace: LiveviewPlaygroundWeb

      import Plug.Conn
      import LiveviewPlaygroundWeb.Gettext
      import ExCell.Controller

      alias LiveviewPlaygroundWeb.Router.Helpers, as: Routes

      def render_view(%Plug.Conn{} = conn, view, assigns \\ []) when is_list(assigns) do
        conn
        |> put_view(view)
        |> render("template.html", assigns)
      end
    end
  end

  def view do
    quote do
      use ExCell.Cell,
        namespace: LiveviewPlaygroundWeb,
        adapter: ExCell.Adapters.CellJS

      use Phoenix.View,
        root: Path.dirname(__ENV__.file),
        path: ""

      use ExCSSModules.View,
        namespace: LiveviewPlaygroundWeb,
        embed_stylesheet: Mix.env() in [:prod, :review],
        stylesheet:
          __ENV__.file
          |> Path.dirname()
          |> Path.join("./style.css")

      # Import convenience functions from controllers
      import Phoenix.Controller,
        only: [get_flash: 1, get_flash: 2, view_module: 1, view_template: 1]

      # Include shared imports and aliases for views
      unquote(view_helpers())

      @doc """
      Translate variants to localized classnames (atoms to strings).
      ## Examples
          iex> variant_classes()
          "button_85d79__variant-default"
          iex> variant_classes(:primary)
          "button_85d79__variant-primary"
          iex> variant_classes([:secondary, :large])
          ["button_85d79__variant-secondary", "button_85d79__variant-large"]
      """
      def variant_classes(variants) do
        variants
        |> variants()
        |> class_name()
      end

      def class_name do
        name() |> class_name()
      end

      def page_title, do: gettext("LiveView Playground")

      defoverridable page_title: 0
    end
  end

  def live_view do
    quote do
      use Phoenix.LiveView,
        layout: {LiveviewPlaygroundWeb.LayoutView, "live.html"}

      unquote(view_helpers())

      def page_title, do: gettext("LiveView Playground")

      defoverridable page_title: 0

      @doc """
      This can be used to inject assigns after mounting the live view in the tests.
      ```
      GenServer.call(view.pid, {:set, :key_in_assigns, %{some: "value"}})
      ```
      """
      def handle_call({:set, var, val}, _, socket) do
        {:reply, :ok, assign(socket, var, val)}
      end
    end
  end

  def live_component do
    quote do
      use Phoenix.LiveComponent

      unquote(view_helpers())
    end
  end

  def router do
    quote do
      use Phoenix.Router

      import Plug.Conn
      import Phoenix.Controller
      import Phoenix.LiveView.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import LiveviewPlaygroundWeb.Gettext
    end
  end

  defp view_helpers do
    quote do
      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      # Import LiveView helpers (live_render, live_component, live_patch, etc)
      import Phoenix.LiveView.Helpers

      # Import basic rendering functionality (render, render_layout, etc)
      import Phoenix.View

      import LiveviewPlaygroundWeb.ErrorHelpers
      import LiveviewPlaygroundWeb.Gettext
      import LiveviewPlaygroundWeb.ViewHelpers
      alias LiveviewPlaygroundWeb.Router.Helpers, as: Routes
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
