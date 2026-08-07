<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Επεξεργασία Report
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            @if ($errors->any())
                <div class="mb-4 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded">
                    <ul class="list-disc list-inside text-sm">
                        @foreach ($errors->all() as $error)
                            <li>• {{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form method="POST" action="{{ route('reports.update', $report) }}">
                @csrf
                @method('PUT')

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                        Τίτλος
                    </label>
                    <input type="text" name="title"
                        value="{{ old('title',$report->title) }}"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                        Περιγραφή
                    </label>
                    <textarea name="description" rows="4"
                                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                         focus:border-indigo-500 focus:ring-indigo-500">{{ old('description', $report->description) }}</textarea>
                </div>

                {{-- Κατηγορία --}}
                <div class="mb-4">
                     <label class="block text-sm font-medium text-gray-700">
                        Κατηγορία
                    </label>
                    <select name="category_id"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                   focus:border-indigo-500 focus:ring-indigo-500">
                        <option value="">-- Επιλέξτε κατηγορία --</option>
                        {{--@foreach ($categories as $category)
                            <option value="{{ $category->id }}"
                                {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                {{ $category->name }}
                            </option>
                        @endforeach--}}
                    </select>
                </div>


                {{-- Τοποθεσία (προς το παρόν χειροκίνητα) --}}
                <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Γεωγραφικό πλάτος (Latitude)
                        </label>
                        <input type="text" name="latitude"
                               value="{{ old('latitude') }}"
                               placeholder="π.χ. 40.6401"
                               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                      focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Γεωγραφικό μήκος (Longitude)
                        </label>
                        <input type="text" name="longitude"
                               value="{{ old('longitude') }}"
                               placeholder="π.χ. 22.9444"
                               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                                      focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                </div>

                {{-- Φωτογραφία / Φωτογραφίες --}}
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700">
                        Φωτογραφίες (προαιρετικό)
                    </label>
                    <input type="file" name="photos[]" multiple
                           class="mt-1 block w-full text-sm text-gray-700">
                    <p class="mt-1 text-xs text-gray-500">
                        Επιτρέπονται εικόνες τύπου JPG, PNG. Μέγιστο μέγεθος ανά αρχείο π.χ. 2MB.
                    </p>
                </div>

                    <div class="flex justify-end gap-3">
                        <a href="{{ route('reports.index') }}"
                           class="text-sm text-gray-600 hover:text-gray-900">
                            Πίσω
                        </a>

                        <button type="submit"
                                class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent
                                       rounded-md font-semibold text-xs text-black uppercase tracking-widest
                                       hover:bg-indigo-500">
                            Αποθήκευση αλλαγών
                        </button>
                    </div>
                                
                </div>
            </form>
        </div>
    </div>
</x-app-layout>