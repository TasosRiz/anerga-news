<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Τα Reports μου
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            @if (session('success'))
                <div class="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded">
                    {{ session('success') }}
                </div>
            @endif

            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-bold">Λίστα Reports</h1>

                <a href="{{ route('reports.create') }}"
                   class="inline-flex items-center px-4 py-2 bg-indigo-600 text-black rounded-md hover:bg-indigo-500">
                    + Νέο Report
                </a>
            </div>
        

            @forelse ($reports as $report)
                <div class="mb-3 bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                    <h3 class="text-lg font-semibold">{{ $report->title }}</h3>
                    <p class="text-gray-600 mt-1">
                        {{ $report->description ?? '— χωρίς περιγραφή —' }}
                    </p>
                    <p class="mt-2 text-sm text-gray-500">
                        Κατάσταση: <span class="font-medium">{{ $report->status }}</span>
                        • {{ $report->created_at->diffForHumans() }}
                    </p>

                    <div class="mt-3 flex gap-2">
                        <a href="{{ route('reports.edit', $report) }}"
                        class="px-3 py-1 text-sm bg-blue-600 text-black rounded hover:bg-blue-500">
                            Επεξεργασία
                        </a>

                        <form method="POST" action="{{ route('reports.destroy', $report) }}"
                            onsubmit="return confirm('Σίγουρα θέλεις να διαγράψεις αυτό το report;');">
                            @csrf
                            @method('DELETE')
                            <button class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500">
                                Διαγραφή
                            </button>
                        </form>
                    </div>
                </div>
            @empty

                <p class="text-gray-500">Δεν έχεις ακόμα κανένα report. Δημιούργησε το πρώτο σου!</p>
            @endforelse
        </div>
    </div>
</x-app-layout>